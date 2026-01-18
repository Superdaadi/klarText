import { Component, ChangeDetectorRef } from '@angular/core';
import { RecordService } from './record.service';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent {
  
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  audioBlob: Blob | null = null;
  stream: MediaStream | null = null;
  
  isRecording: boolean = false;
  isPaused = false;
  micPermission = false;
  isSoundDetected = false;
  volumeLevel = 0;
  isSending = false;
  
  message = '';
  isError = false;
  
  recordingTime = '00:00';
  recordingInterval: any;
  recordingStartTime = 0;
  recordingElapsedTime = 0;

  
  audioUrl: string | null = null;

  
  // Replace with your actual backend endpoint
  private apiUrl = '/api/upload-audio'; 

  constructor(private recordService: RecordService, private cdr: ChangeDetectorRef) {
    this.requestMicrophoneAccess();
    console.log()
  }

  async requestMicrophoneAccess() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.micPermission = true;
      this.showMessage('Mikrofonzugriff gewährt', false);
    } catch (err) {
      this.micPermission = false;
      this.showMessage('Mikrofonzugriff verweigert', true);
      console.error('Mikrofonzugriff fehlgeschlagen:', err);
    }
  }

  async getMicrophones() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'audioinput');
  }
  

  async startRecording() {
    if (!this.stream) {
      await this.requestMicrophoneAccess();
      if (!this.stream) return;
    }

    this.audioChunks = [];
    this.audioBlob = null;
    
    const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
                 ? 'audio/webm' 
                 : 'audio/ogg';

    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType });

    
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(this.audioChunks, { type: mimeType });
      this.audioUrl = URL.createObjectURL(this.audioBlob);
      this.showMessage('Aufnahme gespeichert', false);
      this.cdr.detectChanges();
    };
    
    this.mediaRecorder.start(1000);
    this.isRecording = true;
    this.startTimer();
    this.showMessage('Aufnahme gestartet', false);

    console.log(this.mediaRecorder.state);
  }


  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.stopTimer();
      this.showMessage('Aufnahme gestoppt', false);
    }
  }

  pauseRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
      this.isPaused = true;
      this.pauseTimer();
      this.showMessage('Aufnahme pausiert', false);
    }
  }

  resumeRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
      this.isPaused = false;
      this.resumeTimer();
      this.showMessage('Aufnahme fortgesetzt', false);
    }
  }


  startTimer() {
    this.recordingStartTime = Date.now();
    this.recordingElapsedTime = 0;

    this.recordingInterval = setInterval(() => {
      const elapsed = Date.now() - this.recordingStartTime + this.recordingElapsedTime;
      this.updateRecordingTime(elapsed);
    }, 1000);
  }


  pauseTimer() {
    if (!this.recordingInterval) return;

    clearInterval(this.recordingInterval);
    this.recordingInterval = null;

    this.recordingElapsedTime += Date.now() - this.recordingStartTime;
  }


  resumeTimer() {
    if (this.recordingInterval) return;

    this.recordingStartTime = Date.now();

    this.recordingInterval = setInterval(() => {
      const elapsed = Date.now() - this.recordingStartTime + this.recordingElapsedTime;
      this.updateRecordingTime(elapsed);
    }, 1000);
  }


  stopTimer() {
    if (this.recordingInterval) {
      clearInterval(this.recordingInterval);
      this.recordingInterval = null;
    }

    this.recordingElapsedTime = 0;
    this.recordingTime = '00:00';
  }


  private updateRecordingTime(elapsed: number) {
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    this.recordingTime = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }




  playRecording() {
    if (this.audioBlob) {
      const audio = new Audio(URL.createObjectURL(this.audioBlob));
      audio.play();
      this.showMessage('Wiedergabe gestartet', false);
    }
  }

  async sendToBackend() {
    if (!this.audioBlob) return;

    this.isSending = true;
    const formData = new FormData();
    formData.append('audio', this.audioBlob, 'recording.webm');

    /*try {
      // Passe die URL an dein Backend an
      const response = await this.http.post('/api/audio/upload', formData).toPromise();
      this.showMessage('Erfolgreich an Backend gesendet', false);
      console.log('Backend-Antwort:', response);
    } catch (error) {
      this.showMessage('Fehler beim Senden an Backend', true);
      console.error('Upload-Fehler:', error);
    } finally {
      this.isSending = false;
    }*/
  }

  showMessage(msg: string, error: boolean) {
    this.message = msg;
    this.isError = error;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  ngOnDestroy() {
    this.stopRecording();
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }















  
  sendAudio() {

  }

  resetRecorder() {
    // 1️⃣ MediaRecorder sicher stoppen
    if (this.mediaRecorder) {
      if (this.mediaRecorder.state !== 'inactive') {
        try {
          this.mediaRecorder.stop();
        } catch (e) {
          console.warn('MediaRecorder stop failed:', e);
        }
      }
      this.mediaRecorder = null;
    }

    // 2️⃣ Timer vollständig zurücksetzen
    if (this.recordingInterval) {
      clearInterval(this.recordingInterval);
      this.recordingInterval = null;
    }
    this.recordingStartTime = 0;
    this.recordingElapsedTime = 0;
    this.recordingTime = '00:00';

    // 3️⃣ Recording States zurücksetzen
    this.isRecording = false;
    this.isPaused = false;
    this.isSoundDetected = false;
    this.volumeLevel = 0;
    this.isSending = false;

    // 4️⃣ Audio-Daten freigeben
    this.audioChunks = [];
    this.audioBlob = null;

    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }

    // 5️⃣ MediaStream optional beenden (Hard Reset)
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.micPermission = false;
    }

    // 6️⃣ UI Feedback
    this.showMessage('Recorder zurückgesetzt', false);

    // 7️⃣ Angular aktualisieren
    this.cdr.detectChanges();
  }


}
