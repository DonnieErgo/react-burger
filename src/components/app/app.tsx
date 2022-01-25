import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

class App extends React.Component {
  render () {
    return (
      <>
        <AppHeader />
        <main className={styles.main}>

        </main>
      </>
    )
  }
}

export default App;