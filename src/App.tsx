import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Welcome from './pages/Welcome';
import MainContent from './pages/MainContent';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { initialUser } from './redux/slices/userSlice';
import NumberInputForm from './pages/NumberInputForm';
import SendEmailOtp from './components/SendEmailOtp';
import TaskPage from './pages/TaskPage';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';
import { runPrediction } from './brain/brain';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initialUser());
  }, [dispatch]);

  (async () => {
    const massege = await runPrediction('6723cabddad844449fab895d');
    console.log(massege);
  })();


  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/sendEmail' element={<SendEmailOtp />} />
        <Route path="/otp/:email" element={<NumberInputForm />} />
        <Route element={<Layout />}>
          <Route path='/users' element={<MainContent />} />
          <Route path='/task/:id' element={<TaskPage />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;