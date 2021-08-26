import { useRef, useEffect } from "react";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

type SoundType = "pop" | "beep" 

export default function useSounds(): (sound: SoundType) => void {
    const popSoundRef = useRef<Audio.Sound | null>(null);
    const beepSoundRef = useRef<Audio.Sound | null>(null);

    const playSound = async (sound: SoundType): Promise<void> => {
        const soundsMap = {
            pop: popSoundRef,
            beep: beepSoundRef,
        };
        try {
            const status = await soundsMap[sound].current?.getStatusAsync();
            status &&
                status.isLoaded &&
                soundsMap[sound].current?.replayAsync();
                if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //load sounds
        const popSoundObject = new Audio.Sound();
        const beepSoundObject = new Audio.Sound();

        const loadSounds = async () => {
            /* eslint-disable @typescript-eslint/no-var-requires */
            await popSoundObject.loadAsync(require("../../../assets/sounds/pop.mp3"));
            popSoundRef.current = popSoundObject;

            await beepSoundObject.loadAsync(require("../../../assets/sounds/beep.mp3"));
            beepSoundRef.current = beepSoundObject;

        };
        loadSounds();
        return () => {
            //unload sounds
            popSoundObject && popSoundObject.unloadAsync();
            beepSoundObject && beepSoundObject.unloadAsync();
        };
    }, []);

    return playSound;
}
