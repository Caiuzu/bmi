import React from "react";
import {IonLabel, IonSegment, IonSegmentButton} from "@ionic/react";

const InputControl: React.FC<{
    selectedValue: 'mkg' | 'ftlbs';
    onSelectValue: (value: 'mkg' | 'ftlbs') => void;
}> = props => {
    const inputChangeHandler = (event: CustomEvent) =>{
        props.onSelectValue(event.detail.value);
    };
    return (
        <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
            <IonSegmentButton value="mkg">
                <IonLabel>m/Kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ftlbs">
                <IonLabel>ft/Lbs</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    );
};

export default InputControl;