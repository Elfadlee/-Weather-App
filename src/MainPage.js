import * as React from 'react';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './App.css'; 
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import WbCloudySharpIcon from '@mui/icons-material/WbCloudySharp';
import {useState , useEffect} from 'react';
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
import "dayjs/locale/ar"
import { useSelector ,useDispatch } from 'react-redux';
import { fetchDataWeather } from './weatherAPISlice';
import CircularProgress from '@mui/material/CircularProgress';




    // key Num : https://api.openweathermap.org/data/2.5/weather?q=Liverpool,GB&units=metric&appid=f9d8fef79bc53f7472d2f46351b5efc7


export default function MainContainer() {


  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

 



  const loadLanguagesHandler = () => {
  const next = currentLanguage === 'ar' ? 'en' : 'ar';
  setCurrentLanguage(next);
  i18n.changeLanguage(next);
  dayjs.locale(next);
};

useEffect(() => {
  dispatch(fetchDataWeather());
}, [dispatch]);

if (status === 'idle' || status === 'loading') return <p>Loading...</p>;
if (status === 'failed') return <p>Error: {error}</p>;

const { weatherTemp, weatherMaxTemp, weatherMinTemp, weatherIcon, weatherDescription, currentDate } = data || {};
 
       


  return (
    <Container maxWidth="xl" 
    
    sx={{ bgcolor: '#d8dce0ff', height: '100vh', width: '100vw' , padding: 0 , margin: 0 ,display: 'flex',
     flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        <div className='Box-container' >

            <CardContent  sx={{  bgcolor: '#063563ff', color: '#fff', boxShadow: 3 , width: '100%' ,
             height: '100%', display: 'flex', flexDirection: 'column', borderRadius: "25px" }}
             dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
             className={currentLanguage === 'ar' ? 'ar-font' : 'en-font'}>
                

                    <div style={{  width: '100%' ,textAlign: currentLanguage === 'ar' ? 'right' : 'left' , margin: '0px' , padding: '5px',
                      display: 'flex', flexDirection: 'column'

                     }}>

                        <Typography variant="h2" gutterBottom sx={{ lineHeight : '1.5', fontWeight: 'bold' ,padding: "5px" , margin: 0 }}>
                                   {t('Liverpool, UK')}
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom  sx={{ padding: "5px" , marginLeft: "10px" , fontWeight: 'light' }}>
                                    {currentDate}
                        </Typography>

                    </div>

                    <hr  style={{ width: '100%'}}/>

                <div style={{ display: 'flex', alignItems: 'center' , justifyContent: 'space-between', width: '100%' ,}}>

                       <div>  
                           {status === 'loading' && <CircularProgress style={{ color: '#fff' }} />} 
                           <Typography variant="h1" gutterBottom>
                                    {weatherTemp } &#8451; <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherDescription} />


                            </Typography>

                            <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' ,
                               marginLeft: '20px',  width: 'fit-content' }}>
                                   {t(weatherDescription)}
                            </Typography>


                            <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' , marginTop: '20px',marginLeft: '22px' }}>
                                   {t('max')} : {weatherMaxTemp}  &#8451; |  {t('min')} : {weatherMinTemp}  &#8451;
                            </Typography>

                       </div>
                            
                        <div>

                        <Typography gutterBottom sx={{  margin: 0  , padding: 0 , width: '50%',height: 'x0%',}}>

                        <WbCloudySharpIcon fontSize="large"  style={{ color: '#fff' , width: '500px', height: '250px'}}/>
                        
                            
                        </Typography>

                        </div>
                        
                    
                </div>

        </CardContent>
                 
        </div>

                <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end", marginRight: "250px" , marginTop: "20px" }}>
                           <Button 
                           variant="outlined"
                           sx={{ borderColor: '#160241ff', color: '#060232ff' }}
                           onClick={loadLanguagesHandler}
                            >{currentLanguage === 'en' ? 'Arabic' : 'English'}</Button>
                           
                </Stack>

      
    </Container>
  );
}
