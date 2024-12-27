/* ----------- RESOURCES ----------- */
import { useRef, useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'Hooks/useTheme'

/* ----------- COMPONENTS ----------- */
import { Button } from 'react-bootstrap'

/* ----------- STYLES ----------- */
import styles from 'Components/Header/styles.module.scss'


export function DropdownMenu() {
  const { theme } = useTheme()
  const [isActive, setIsActive] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { pathname, locale, push } = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    function pageClick(evt: MouseEvent) {
      if (!Object.is(evt.target, buttonRef.current) && isActive)
        setIsActive(false)
    }

    function pageKeyPress(evt: KeyboardEvent) {
      if (evt?.key == 'Escape') setIsActive(false)
    }

    let doc = document.querySelector('body')


    doc && doc.addEventListener('click', pageClick)
    doc && doc.addEventListener('keydown', pageKeyPress)


    return () => {
      doc && doc.removeEventListener('click', pageClick)
      doc && doc.removeEventListener('keydown', pageKeyPress)
    }
  }, [isActive])

  const changeLanguage = (setLocale) => push(pathname, pathname, { locale: setLocale })

  const languages = [
    { language: t('portuguese'), location: 'pt-BR' },
    { language: t('english'), location: 'en-US' },
    { language: t('spanish'), location: 'es-ES' },
    { language: t('arabic'), location: 'ar-AA' },
    { language: t('french'), location: 'fr-FR' },
  ]

  const LanguagesMemoized = languages.map(({ language, location }, index) => (
    <span
      className={`${styles.option} ${styles[theme]}`}
      key={index}
      onClick={() => changeLanguage(location)}
    >
      {language}
    </span>
  ))


  return (
    <>
      <div className={styles.dropdownMenuContainer}>
        <Button
          className={`${styles.dropdownButton} ${styles[theme]} remove-focus`}
          ref={buttonRef}
          onClick={() => setIsActive(!isActive)}
        >
          {
            languages
              .filter(({ location }) => location === locale)[0]
              .language
          }
        </Button>

        <div className={`${styles.dropdown} ${styles[theme]} ${isActive ? styles.active : ''}`} >
          <div className={styles.select}>
            {LanguagesMemoized}
          </div>
        </div>
      </div>

    </>
  )
}