import {AudioInputView} from "./AudioInputView";
import {useState} from "react";
import {AudioPlayView} from "./AudioPlayView";
import {Button, View} from "react-native";
import {transcribeAudio} from "./OpenAIUtils";

export const AudioView = () => {

    const [recordingLocation, setRecordingLocation] = useState();

    return (
        <View style={{display: "flex"}}>
            <AudioInputView
                recordingLocationCallback={setRecordingLocation}>
            </AudioInputView>
            <AudioPlayView
                recordingLocation={recordingLocation}>
            </AudioPlayView>
            <Button title={"Send transcription request"}
                    disabled={recordingLocation == null}
                    onPress={() => transcribeAudio(recordingLocation)}
            >
            </Button>
        </View>
    );
};