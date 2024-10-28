import Calender from './calender';
import Departments from './department';

const Main = () => {
    return (
        <>
            {
                localStorage.getItem('type') === 'hospital' ? (
                    <Departments />
                ) : (
                    <Calender />
                )
            }
        </>
    )
};

export default Main;
