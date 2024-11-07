import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from "@fullcalendar/core";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomModal from '../components/modal';
import dayjs, { Dayjs } from 'dayjs';
import { useContext } from '../context';
import { deleteSlots, getSlots, manageSlots } from '../api';
import moment from 'moment';
import toast from 'react-hot-toast';
import { debounce } from 'lodash';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DoctorCalendar = () => {
    const { state, setCalendarDetails } = useContext();
    const { addSlots, endDate, endTime, removeSlots, selectedDays, startDate, startTime, events } = state.calendarDetails;

    const resetSelections = () => {
        setCalendarDetails((prev) => ({
            ...prev,
            addSlots: false,
            removeSlots: false,
            selectedDays: new Set(),
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null
        }));
    }

    const getSlotsForDoctor = async (startDate: Dayjs | null = null ) => {
        const payload = {
            startDate: startDate ?
                moment(startDate.toISOString()).startOf('month').format('DD-MM-YYYY') :
                moment().startOf('month').format('DD-MM-YYYY'),
            endDate: ''
        }

        payload.endDate = startDate ? 
                moment(startDate.toISOString()).endOf('month').format('DD-MM-YYYY') :
                moment().endOf('month').format('DD-MM-YYYY');

        const slots = await getSlots(payload);
        if (slots) {
            setCalendarDetails((prev) => ({
                ...prev,
                addSlots: false,
                removeSlots: false,
                selectedDays: new Set(),
                startDate: dayjs(moment(payload.startDate, 'DD-MM-YYYY').toISOString()),
                endDate: dayjs(moment(payload.endDate, 'DD-MM-YYYY').toISOString()),
                startTime: null,
                endTime: null,
                events: slots.map((item: Record<string, string>) => ({
                    title: item.title || 'Available slots',
                    start: moment(`${item.date} ${item.startTime}`, 'DD-MM-YYYY hh:mm A').format('YYYY-MM-DD[T]HH:mm:ss'),
                    end: moment(`${item.date} ${item.endTime}`, 'DD-MM-YYYY hh:mm A').format('YYYY-MM-DD[T]HH:mm:ss'),
                    backgroundColor: item.status === 'AVAILABLE' ? '#2c67f2' : 'red'
                }))
            }))
        }
    }

    const debounceDateChange = debounce((date) => {
        if (
            moment(date).isBefore(moment(startDate?.toISOString())) ||
            moment(date).isAfter(moment(endDate?.toISOString()))
        ) {
            getSlotsForDoctor(date)
        }
    }, 500);

    const handleDateClick = ({ dateStr }: DateClickArg) => {
        setCalendarDetails((prev) => ({
            ...prev,
            addSlots: true,
            startDate: dayjs(dateStr),
            endDate: null
        }));
    };

    const handleEventClick = (event: EventClickArg) => {
        setCalendarDetails((prev) => ({
            ...prev,
            removeSlots: true,
            endDate: null,
            startDate: null
        }));
    };

    const resetState = () => {
        setCalendarDetails((prev) => ({
            ...prev,
            addSlots: false,
            endTime: null,
            removeSlots: false,
            selectedDays: new Set(),
            startTime: null
        }))
    }

    const handleAddSlots = async () => {
        if (!startDate || !endDate || !startTime || !endTime || !selectedDays.size) {
            toast.error('Invalid selections');
            return;
        }

        const payload = {
            weekDays: Array.from(selectedDays),
            startDate: moment(startDate.toISOString()).format('DD-MM-YYYY'),
            endDate: moment(endDate.toISOString()).format('DD-MM-YYYY'),
            dayStartTime: moment(startTime.toISOString()).format('hh:mm A'),
            dayEndTime: moment(endTime.toISOString()).format('hh:mm A')
        }

        const res = await manageSlots(payload);
        if (res) {
            resetState();
            toast.success(res.message);
        }
    }

    const handleRemoveSlots = async () => {
        if (!startDate || !endDate || !selectedDays.size) {
            toast.error('Invalid selections');
            return;
        }

        const payload = {
            weekDays: Array.from(selectedDays),
            startDate: moment(startDate.toISOString()).format('DD-MM-YYYY'),
            endDate: moment(endDate.toISOString()).format('DD-MM-YYYY')
        }

        const res = await deleteSlots(payload);
        if (res) {
            resetState();
            toast.success(res.message);
        }
    }

    const toggleDay = (day: string) => {
        const newSelectedDays = new Set(selectedDays);
        if (newSelectedDays.has(day)) {
            newSelectedDays.delete(day);
        } else {
            newSelectedDays.add(day);
        }
        setCalendarDetails((prev) => ({
            ...prev,
            selectedDays: newSelectedDays
        }));
    };

    return (
        <div className="container mx-auto mt-10 p-5">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridDay"
                eventDisplay='block'
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
                datesSet={(info) => {
                    debounceDateChange(info.view.currentStart);
                }}
            />

            {/* add slots modal */}
            <CustomModal
                title='Add Slots'
                open={addSlots}
                onClose={resetSelections}
                onSuccess={handleAddSlots}
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
                                ${selectedDays.has(day) ? 'bg-primary text-white' : ''}
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
                            onChange={(date) => {
                                setCalendarDetails((prev) => ({
                                    ...prev,
                                    startDate: date
                                }));
                            }}
                        />
                        <DatePicker
                            label="End Date"
                            format='DD-MM-YYYY'
                            minDate={dayjs(startDate)}
                            value={endDate}
                            onChange={(date) => {
                                setCalendarDetails((prev) => ({
                                    ...prev,
                                    endDate: date
                                }));
                            }}
                        />
                    </div>

                    <div className="mt-4 text-black text-xl font-poppins">Time</div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TimePicker
                            label="Start Time"
                            format='hh:mm A'
                            value={startTime}
                            onChange={(time) => {
                                setCalendarDetails((prev) => ({
                                    ...prev,
                                    startTime: time
                                }));
                            }}
                        />
                        <TimePicker
                            label="End Time"
                            format='hh:mm A'
                            minTime={dayjs(startTime)}
                            value={endTime}
                            onChange={(time) => {
                                setCalendarDetails((prev) => ({
                                    ...prev,
                                    endTime: time
                                }));
                            }}
                        />
                    </div>
                </LocalizationProvider>
            </CustomModal>

            {/* remove slots modal */}
            <CustomModal
                title='Remove Slots'
                open={removeSlots}
                onClose={resetSelections}
                onSuccess={handleRemoveSlots}
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
                                ${selectedDays.has(day) ? 'bg-primary text-white' : ''}
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
                            onChange={(date) => {
                                setCalendarDetails((prev) => ({
                                    ...prev,
                                    startDate: date
                                }));
                            }}
                        />
                        <DatePicker
                            label="End Date"
                            format='DD-MM-YYYY'
                            minDate={dayjs(startDate)}
                            value={endDate}
                            onChange={(date) => {
                                setCalendarDetails((prev) => ({
                                    ...prev,
                                    endDate: date
                                }));
                            }}
                        />
                    </div>
                </LocalizationProvider>
            </CustomModal>
        </div>
    );
};

export default DoctorCalendar;
