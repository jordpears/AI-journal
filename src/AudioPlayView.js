import {Button, View} from "react-native";
import {Audio} from 'expo-av';
import {useEffect, useState} from "react";

export const AudioPlayView = props => {

    const [sound, setSound] = useState();

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
                    style={{margin: 20}}
            >
            </Button>
        </View>
    );
};