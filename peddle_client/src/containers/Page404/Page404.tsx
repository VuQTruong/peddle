// @ts-ignore
import pageNotFound from '../../assets/page-not-found.png';
import NavBar from '../../components/NavBar/NavBar';

export default function Page404() {
  return (
    <main>
      <section className='container page404__container'>
        <img className='page404__img' src={pageNotFound} alt='Page Not Found' />
        <h2 className='page404__title'>404</h2>
        <h3 className='page404__subtitle'>Page not found</h3>
      </section>
      <NavBar />
    </main>
  );
}
