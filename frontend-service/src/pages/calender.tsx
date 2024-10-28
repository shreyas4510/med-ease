import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from "@fullcalendar/core";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomModal from '../components/modal';
import dayjs, { Dayjs } from 'dayjs';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const events = [
    {
        title: 'Check-up with Dr. Smith',
        start: '2024-10-29T14:00:00',
        end: '2024-10-29T15:00:00',
        backgroundColor: 'red'
    },
    {
        title: 'Vaccination Appointment',
        start: '2024-10-30T14:00:00',
        end: '2024-10-30T15:00:00',
        backgroundColor: 'green'
    },
    {
        title: 'Follow-up Consultation',
        start: '2024-10-31T14:00:00',
        end: '2024-10-31T15:00:00',
        backgroundColor: 'yellow'
    },
    {
        title: 'Annual Health Check',
        start: '2024-11-05T14:00:00',
        end: '2024-11-05T15:00:00',
    },
]

const DoctorCalendar = () => {
    const [addSlots, setAddSlots] = useState(false);
    const [removeSlots, setRemoveSlots] = useState(false);

    const [selectedDays, setSelectedDays] = useState(new Set());
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);

    const resetSelections = () => {
        setAddSlots(false);
        setRemoveSlots(false);
        setSelectedDays(new Set());
        setStartDate(null);
        setEndDate(null);
        setStartTime(null);
        setEndTime(null);
    }

    const handleDateClick = ({ dateStr }: DateClickArg) => {
        setAddSlots(true)
        setStartDate(dayjs(dateStr))
    };

    const handleEventClick = ( _event: EventClickArg) => {
        setRemoveSlots(true)
    };

    const toggleDay = (day: string) => {
        const newSelectedDays = new Set(selectedDays);
        if (newSelectedDays.has(day)) {
            newSelectedDays.delete(day);
        } else {
            newSelectedDays.add(day);
        }
        setSelectedDays(newSelectedDays);
    };

    return (
        <div className="container mx-auto mt-10 p-5">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                customButtons={{}}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                selectable={true}
                events={events}
                dateClick={handleDateClick}
                dayHeaderClassNames="bg-light"
                eventClick={handleEventClick}
            />

            {/* add slots modal */}
            <CustomModal
                title='Add Slots'
                open={addSlots}
                onClose={resetSelections}
                onSuccess={() => {
                    // TODO: add api integration
                }}
                key={'add-slots-modal'}
                className='w-4/5 md:w-1/3'
            >
                <div className="text-black text-xl font-poppins">Select Days</div>
                <div className="flex justify-center">
                    {daysOfWeek.map((day) => (
                        <div
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`
                                w-12 mx-2 my-4 text-center border
                                ${ selectedDays.has(day) ? 'bg-primary text-white' : '' }
                                rounded-lg p-2 cursor-pointer hover:shadow-xl hover:translate-y-[-2px]
                            `}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="mt-4 text-black text-xl font-poppins">Date</div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DatePicker
                            label="Start Date"
                            format='DD-MM-YYYY'
                            value={startDate}
                            onChange={setStartDate}
                        />
                        <DatePicker
                            label="End Date"
                            format='DD-MM-YYYY'
                            minDate={dayjs(startDate)}
                            value={endDate}
                            onChange={setEndDate}
                        />
                    </div>

                    <div className="mt-4 text-black text-xl font-poppins">Time</div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TimePicker
                            label="Start Time"
                            format='hh:mm A'
                            value={startTime}
                            onChange={setStartTime}
                        />
                        <TimePicker
                            label="End Time"
                            format='hh:mm A'
                            minTime={dayjs(startTime)}
                            value={endTime}
                            onChange={setEndTime}
                        />
                    </div>
                </LocalizationProvider>
            </CustomModal>

            {/* remove slots modal */}
            <CustomModal
                title='Remove Slots'
                open={removeSlots}
                onClose={resetSelections}
                onSuccess={() => {
                    // TODO: remove api integration
                }}
                key={'remove-slots-modal'}
                className='w-4/5 md:w-1/3'
            >
                <div className="text-black text-xl font-poppins">Select Days and Times</div>
                <div className="flex justify-center">
                    {daysOfWeek.map((day) => (
                        <div
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`
                                w-12 mx-2 my-4 text-center border
                                ${ selectedDays.has(day) ? 'bg-primary text-white' : '' }
                                rounded-lg p-2 cursor-pointer hover:shadow-xl hover:translate-y-[-2px]
                            `}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="mt-4 text-black text-xl font-poppins">Date</div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DatePicker
                            label="Start Date"
                            format='DD-MM-YYYY'
                            value={startDate}
                            onChange={setStartDate}
                        />
                        <DatePicker
                            label="End Date"
                            format='DD-MM-YYYY'
                            minDate={dayjs(startDate)}
                            value={endDate}
                            onChange={setEndDate}
                        />
                    </div>
                </LocalizationProvider>
            </CustomModal>
        </div>
    );
};

export default DoctorCalendar;
