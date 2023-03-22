import {AudioInputView} from "./AudioInputView";
import {useState} from "react";
import {AudioPlayView} from "./AudioPlayView";
import {Button, View} from "react-native";

export const AudioView = () => {

    const uploadAudio = (recordingLocation: string): Promise<void> => {
        return Promise.resolve();
    }

    const [recordingLocation, setRecordingLocation] = useState('');

    return (
        <View style={{display: "flex"}}>
            <AudioInputView
                setRecordingLocation={setRecordingLocation}>
            </AudioInputView>
            <AudioPlayView
                recordingLocation={recordingLocation}>
            </AudioPlayView>
            <Button title={"Send s3 upload request"}
                    disabled={recordingLocation == ''}
                    onPress={() => uploadAudio(recordingLocation)}
            />
        </View>
    );
};