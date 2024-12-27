/* ----------- RESOURCES ----------- */
import { useState, useRef, useEffect, forwardRef, Ref, HTMLAttributes } from 'react'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'Hooks/useTheme'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

/* ----------- COMPONENTS ----------- */
import { IoMdClose, IoMdSearch } from 'react-icons/io'
import { AiFillAudio } from 'react-icons/ai'
import {
    Col,
    Overlay,
    InputGroup,
    FormControl,
    Button,
    Popover
} from 'react-bootstrap'

/* ----------- STYLES ----------- */
import styles from 'Components/InputSearch/styles.module.scss'

function InputSearch(
    {
        className,
        ...props
    }: HTMLAttributes<HTMLDivElement>,
    ref: Ref<any>
) {
    let idTimeout: any[] = []

    const { theme } = useTheme()
    const [text, setText] = useState('')
    const [isListening, setIsListening] = useState(false)
    const [alert, setAlert] = useState(false)
    const [target, setTarget] = useState(null)

    const { t } = useTranslation()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const box_iconRef = useRef<HTMLDivElement>(null)

    const commands = [
        {
            command: 'clear',
            callback: () => resetTranscript()
        },
        {
            command: 'search',
            callback: () => buttonRef.current && buttonRef.current.click()
        }
    ]

    const { transcript, resetTranscript } = useSpeechRecognition({ commands })

    /**
     * Toggle the recognition
     * @param MouseEvent<HTMLButtonElement> event 
     * @return void 
     */
    function speaking(event) {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            setAlert(x => !x)
            setTarget(event.target)
            return
        }

        (isListening) ?
            SpeechRecognition.stopListening() :
            SpeechRecognition.startListening({ continuous: true })

        setIsListening(x => !x);
    }

    /**
     * @description Remove the alert with setTimeout
     */
    useEffect(() => {
        if (alert)
            idTimeout.push(setTimeout(() => setAlert(false), 3800))

        return () => {
            idTimeout.forEach(id => clearTimeout(id))
        }
    }, [alert])

    return (
        <>
            <div
                className={`${styles.search_container} ${className} col-11 col-xxl-5 col-xl-5 col-lg-5 col-md-8`}
                ref={ref}
                {...props}
            >
                <InputGroup className='p-0'>
                    <FormControl
                        className={`${styles.search} ${styles[theme]} remove-focus`}
                        placeholder='Pesquise aqui'
                        aria-label='Pesquise aqui'
                        aria-describedby='input para pesquisa de artigos e notícias'
                        onChange={event => setText(event.target.value)}
                        value={text}
                    />

                    <InputGroup.Text className={`${styles.input_group_text} ${styles[theme]}`}>
                        <div className={`${styles.box_icon} col-1 offset-1 p-0 m-0`}>
                            <Button
                                className={`${styles.button_clear} ${text.length == 0 ? 'd-none' : ''} remove-focus border-0`}
                                title='Limpar pesquisa'
                                onClick={_ => (setText(''))}
                                aria-hidden='true'
                            >
                                <IoMdClose className={`${styles.icon_clear} ${styles[theme]}`} />
                            </Button>
                        </div>
                    </InputGroup.Text>

                    <InputGroup.Text className={`${styles.input_group_text} ${styles[theme]}`}>
                        <div className={`${styles.box_icon} col-1 offset-1 p-0 m-0`} ref={box_iconRef}>
                            <Button className={`${styles.button_audio} remove-focus border-0`} title='Fale para pesquisar' onClick={speaking} >
                                <AiFillAudio className={`${styles.icon_audio} ${styles[theme]} ${isListening ? styles.listening : ''}`} />
                            </Button>
                            <Overlay
                                show={alert}
                                target={target}
                                placement='bottom'
                                container={box_iconRef}
                                transition
                            >
                                <Popover className={`${styles.popover_container} ${styles[theme]}`}>
                                    <Popover.Body className={`${styles.popover_body} ${styles[theme]}`}>
                                        <p className={`${styles.popover_title} mb-0`}>{t('pages.home.popover_message')}</p>
                                    </Popover.Body>
                                </Popover>
                            </Overlay>
                        </div>
                    </InputGroup.Text>

                    <InputGroup.Text className={`${styles.input_group_text} ${styles[theme]}`}>
                        <div className={`${styles.box_icon} col-3 p-0 m-0`} >
                            <Button className={`${styles.button_search} remove-focus`} ref={buttonRef} title='Click para pesquisar'>
                                <IoMdSearch className={styles.icon_search} />
                            </Button>
                        </div>
                    </InputGroup.Text>
                </InputGroup>
            </div>
        </>
    )
}


export default forwardRef(InputSearch)