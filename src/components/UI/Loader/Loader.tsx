import { useLottie } from "lottie-react";
import loaderAnimation from "@config/loader.json";
import styles from './Loader.module.scss';


export const Loader = () => {
    const options = {
        animationData: loaderAnimation,
        loop: true
    };
    const { View } = useLottie(options);

    return <div data-test-id='loader' className={styles.loader}>
        {View}</div>
};

