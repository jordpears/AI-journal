type getSignedURLFromS3Body = {
    uploadURL: string;
    key: string;
}

export class ServerUtils {

    static async submitRecording(recordingLocation: string, setIsS3Submitted: (arg: boolean) => void): Promise<void> {
        const signedUrl = await ServerUtils.getSignedURLFromS3();
        await ServerUtils.putRecordingObjectToS3(signedUrl.uploadURL, recordingLocation);
        setIsS3Submitted(true);
    }

    static async putRecordingObjectToS3(signedS3Url: string, recordingLocation: string): Promise<void> {
        const recordingObject = await fetch(recordingLocation)
        const recordingObjectBlob = await recordingObject.blob()
        const response = await fetch(signedS3Url, {
            body: recordingObjectBlob,
            headers: {
                "Content-Type": "audio/mp4"
            },
            method: "PUT"
        });
        if (!response.ok) {
            throw new Error("Failed to submit file to s3 bucket");
        } else {
            console.debug('successful s3 submission');
        }
    }

    static async getSignedURLFromS3(): Promise<getSignedURLFromS3Body> {
        const signedUrlResponse = await fetch('https://d4zqnyx059.execute-api.eu-west-1.amazonaws.com/uploads');
        if (signedUrlResponse.ok) {
            console.debug('successful request for get signed url');
            return await signedUrlResponse.json();
        } else {
            console.error(signedUrlResponse.statusText);
            throw new Error('Unable to get signed URL from AWS');
        }
    }
}