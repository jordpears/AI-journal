import {Button, View} from "react-native";
import {Audio} from 'expo-av';
import {ReactNode, useState} from "react";
import {Recording} from "expo-av/build/Audio/Recording";

type AudioInputViewProps = {
    setRecordingLocation: (arg: string) => void;
    children?: ReactNode
}
export const AudioInputView = (props: AudioInputViewProps) => {

    const [recording, setRecording] = useState<Recording | undefined>();

    const toggleRecording = async () => {
        recording ? await stopRecording() : await startRecording();
    }

    async function stopRecording() {
        console.debug('Stopping recording..');
        if (recording == undefined) {
            return;
        }
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        props.setRecordingLocation(uri ?? '');
        console.debug('Recording stopped and stored at', uri);
        setRecording(undefined);
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
            const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
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
            />
        </View>
    );
};