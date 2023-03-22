import {Button, View} from "react-native";
import {Audio} from 'expo-av';
import {ReactNode, useEffect, useState} from "react";
import {Sound} from "expo-av/build/Audio/Sound";

type AudioPlayViewProps = {
    recordingLocation: string;
    children?: ReactNode
}
export const AudioPlayView = (props: AudioPlayViewProps) => {


    const [sound, setSound] = useState<Sound>();

    async function playSound() {
        console.debug('Loading Sound');
        console.debug(props.recordingLocation);
        const {sound} = await Audio.Sound.createAsync({uri: props.recordingLocation});
        setSound(sound);
        console.debug('Playing Sound');
        await sound.playAsync().catch(e => console.error(e));
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View>
            <Button title={props.recordingLocation != null ? "Playback Recording" : "No Recording"}
                    disabled={props.recordingLocation == null}
                    onPress={playSound}
            />
        </View>
    );
};