import React, { memo } from 'react'
import styles from './loading.module.css'

const Loading = (props) => {
    // useEffect(()=>{
    //     console.log('Loading - useEffect', props)
    // }, [])

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <h1>Loading</h1>
            </div>
        </div>
    )
}

export default memo(Loading)
