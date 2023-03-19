import {StyleSheet, View} from 'react-native';
import {AudioView} from "./src/AudioView";

export default function App() {
    return (
        <View style={styles.container}>
            <AudioView></AudioView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
