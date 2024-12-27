/* ----------- RESOURCES ----------- */
import { forwardRef, Ref } from 'react'

/* ----------- COMPONENTS ----------- */
import { ButtonProps } from 'react-bootstrap'
import ButtonBST from 'react-bootstrap/Button'

/* ----------- STYLES ----------- */
import styles from 'Components/Button/styles.module.scss'


function Button(
    { children, className, ...props }: ButtonProps,
    ref?: Ref<any>
) {

    return (
        <ButtonBST ref={ref} className={`${styles.button} ${className}`} {...props} >
            {children}
        </ButtonBST>
    )
}

export default forwardRef(Button)