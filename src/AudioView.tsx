import {AudioInputView} from "./AudioInputView";
import {useState} from "react";
import {AudioPlayView} from "./AudioPlayView";
import {Button, View} from "react-native";
import {ServerUtils} from "./ServerUtils";

export const AudioView = () => {

    const [recordingLocation, setRecordingLocation] = useState('');
    const [isS3Submitted, setIsS3Submitted] = useState(false);

    return (
        <View style={{display: "flex"}}>
            <AudioInputView
                setRecordingLocation={setRecordingLocation}>
            </AudioInputView>
            <AudioPlayView
                recordingLocation={recordingLocation}>
            </AudioPlayView>
            <Button title={!isS3Submitted ? "Send s3 upload request" : "submission successful"}
                    disabled={recordingLocation == '' || isS3Submitted}
                    onPress={() => ServerUtils.submitRecording(recordingLocation, setIsS3Submitted)}
            />
        </View>
    );
};