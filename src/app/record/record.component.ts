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

  protected isRecording: boolean = false;
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  audioBlob: Blob | null = null;
  audioUrl: string | null = null;

  private currentStream: MediaStream | null = null;
  
  // Replace with your actual backend endpoint
  private apiUrl = '/api/upload-audio'; 

  constructor(private recordService: RecordService, private cdr: ChangeDetectorRef) {}


  ngOnDestroy(): void {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
  }

  // --- Recording Logic ---
  
  async startRecording() {
    this.audioChunks = [];
    this.audioBlob = null;
    
    // Revoke existing URL before starting a new recording
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }

    try {
      // 1. Get access to the microphone stream
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Store the stream so we can stop it later
      this.currentStream = stream; 
      
      // 2. Initialize MediaRecorder
      this.mediaRecorder = new MediaRecorder(stream);

      // 3. Event listener for when data is available (This is where the audio data is pushed)
      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        this.audioChunks.push(event.data);
      };

      // 4. Event listener for when recording stops (Now only handles Blob creation/URL)
      this.mediaRecorder.onstop = () => {
        console.log("OnStop geht")
        // Combine all chunks into a single Blob
        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        
        // Create a URL for playback in the HTML <audio> element
        this.audioUrl = URL.createObjectURL(this.audioBlob);

        // WICHTIG: Change Detection manuell triggern
        this.cdr.detectChanges();
        
        // Console log to confirm this block executed
        console.log('Recording stopped. Audio Blob created.', this.audioUrl); 
      };

      this.mediaRecorder.start();
      this.isRecording = true;
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Check permissions.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      // 1. Stop the MediaRecorder. This will trigger the `onstop` event listener.
      this.mediaRecorder.stop();
      this.isRecording = false;
      
      // 2. Explicitly stop the tracks on the stored stream to release the mic
      if (this.currentStream) {
        this.currentStream.getTracks().forEach(track => track.stop());
        this.currentStream = null;
      }
    }

    console.log(this.audioUrl)
  }

  // --- Sending to Backend ---
  
  sendAudio() {
    /*if (!this.audioBlob) {
      alert('No audio recorded to send.');
      return;
    }

    // Use FormData to correctly package the file for a multipart/form-data POST request
    const formData = new FormData();
    // 'audioFile' is the key your backend expects
    formData.append('audioFile', this.audioBlob, 'recording.webm');



    // Send the data using the HttpClient service
    this.http.post(this.apiUrl, formData).subscribe({
      next: (response) => {
        console.log('Audio sent successfully!', response);
        alert('Audio sent to backend!');
        this.resetRecorder();
      },
      error: (err) => {
        console.error('Error sending audio:', err);
        alert('Failed to send audio.');
      }
    });*/
  }

  resetRecorder() {
    this.audioBlob = null;
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
      this.cdr.detectChanges();
    }
    this.audioChunks = [];
  }


}
