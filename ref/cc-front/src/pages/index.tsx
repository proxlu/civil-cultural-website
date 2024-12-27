import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Home from 'Pages/home'

const index = (props) => <Home {...props} />

export default index


export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    }
  }
}
