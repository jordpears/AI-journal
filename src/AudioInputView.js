import {Button, View} from "react-native";
import {Audio} from 'expo-av';
import {useState} from "react";

export const AudioInputView = props => {

    const [recording, setRecording] = useState();

    const toggleRecording = async () => {
        recording ? await stopRecording() : await startRecording();
    }

    async function stopRecording() {
        console.debug('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        props.recordingLocationCallback(uri);
        console.debug('Recording stopped and stored at', uri);
    }

    async function startRecording() {
        try {
            console.debug('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.debug('Starting recording..');
            const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.debug('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    return (
        <View>
            <Button title={!recording ? "Start Recording" : "Stop"}
                    onPress={toggleRecording}
                    style={{margin: 20}}
            >
            </Button>
        </View>
    );
};