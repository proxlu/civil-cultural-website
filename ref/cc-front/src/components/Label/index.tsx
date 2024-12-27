/* ----------- RESOURCES ----------- */
import { forwardRef } from 'react'
import { useTheme } from 'Hooks/useTheme'

/* ----------- CONTRACTS ----------- */
import { LabelProps } from 'Contracts/Components'

/* ----------- STYLES ----------- */
import styles from 'Components/Label/styles.module.scss'

import {
    FloatingLabel
} from 'react-bootstrap'

interface RefLabel {
    current: HTMLDivElement | null
}

function Label(
    { children, className = '', ...props }: LabelProps,
    ref: RefLabel
) {
    const { theme } = useTheme()

    return (
        <FloatingLabel
            ref={ref}
            className={`${styles.float_label} ${styles[theme]} ${className}`}
           {...props}
        >
            {children}
        </FloatingLabel>
    )
}



export default forwardRef(Label)