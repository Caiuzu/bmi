import React, {useRef, useState} from 'react';
import {
    IonAlert,
    IonApp,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';

/* My Components */
import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResults";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import InputControl from "./components/InputControl";


const App: React.FC = () => {
    const [calculatedBmi, setCalculatedBmi] = useState<number>();
    const [error, setError] = useState<string>();
    const [calculateUnits, setCalculateUnits] = useState<'mkg' | 'ftlbs'>('mkg');

    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const weightInputRef = useRef<HTMLIonInputElement>(null);

    const calculateBMI = () => {

        const enteredHeight = heightInputRef.current!.value;
        const enteredWeight = weightInputRef.current!.value;

        //verifica se conteudo é null
        if (!enteredWeight || !enteredHeight ||
            +enteredWeight <= 0 || +enteredHeight <= 0) {
            setError('Enter valid number');
            return;
        }

        const weightConversionFactor = calculateUnits === 'ftlbs' ? 2.2 : 1;
        const heightConversionFactor = calculateUnits === 'ftlbs' ? 3.28 : 1;

        const weight = +enteredWeight / weightConversionFactor;
        const height = +enteredHeight / heightConversionFactor; // + converte em numero

        const bmi = weight / (height * height);

        //console.log(bmi);
        setCalculatedBmi(bmi);
    };

    const resetInputs = () => {
        weightInputRef.current!.value = '';
        heightInputRef.current!.value = '';
    };

    const clearError = () => {
        setError('');
    };

    const selectCalculateUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
        setCalculateUnits(selectedValue);
    };

    return (
        <React.Fragment>
            <IonAlert
                isOpen={!!error}
                message={error}
                buttons={[{
                    text: 'OK', handler: clearError
                }]}
            />

            <IonApp>

                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>BMI Calculator</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className={"ion-padding"}>
                    <IonGrid>

                        <IonRow>
                            <IonCol>
                                <InputControl
                                    selectedValue={calculateUnits}
                                    onSelectValue={selectCalculateUnitHandler}
                                />
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">
                                        Height ({calculateUnits === 'mkg' ? 'meters' : 'feet'})
                                    </IonLabel>
                                    <IonInput type="number" ref={heightInputRef}/>
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">
                                        Weight ({calculateUnits === 'mkg' ? 'kg' : 'lbs'})
                                    </IonLabel>
                                    <IonInput type="number" ref={weightInputRef}/>
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        <BmiControls onCalculate={calculateBMI} onReset={resetInputs}/>

                        {calculatedBmi && (
                            <BmiResult result={calculatedBmi}/>
                        )} {/*só exibir se calculated tiver valor*/}

                    </IonGrid>
                </IonContent>

            </IonApp>
        </React.Fragment>
    );
}

export default App;
