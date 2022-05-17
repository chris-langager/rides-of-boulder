import React, { useState } from 'react';
import logo from './logo.svg';
import '@fullcalendar/react/dist/vdom'; //fixes Please import the top-level fullcalendar lib before attempting to import a plugin. error (https://github.com/fullcalendar/fullcalendar/issues/6371)
import FullCalendar, { EventApi } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from 'react-modal';

interface Org {
  id: string;
  name: string;
  website: string;
}

interface Ride {
  orgId?: string;
  name: string;
  start: string;
  website: string;
}

const orgs: Org[] = [
  {
    id: 'rdc',
    name: 'RDC',
    website: 'https://rideordie.org/',
  },
  {
    id: 'gd',
    name: 'GRVL DNKYS',
    website: 'https://www.grvldnkys.com/',
  },
  {
    id: 'tgif',
    name: "Thank Gravel it's Friday",
    website: 'https://www.thankgravelitsfriday.com/',
  },
];

const orgsById = orgs.reduce((acc, org) => {
  acc[org.id] = org;
  return acc;
}, {} as Record<string, Org>);

const rides: Ride[] = [
  {
    orgId: 'rdc',
    name: 'That Other Gravel Ride',
    start: '2022-05-18T17:30:00',
    website:
      'https://rideordie.org/events/that-other-gravel-ride-2-l74xz-kpgh9-9k8ad-jw6zl-gjn9m',
  },
  {
    orgId: 'gd',
    name: 'Fast Gravel',
    start: '2022-05-19T18:00:00',
    website: 'https://www.grvldnkys.com/fastgrvl',
  },
  {
    orgId: 'tgif',
    name: 'TGIF T-shirt Ride',
    start: '2022-06-03T17:30:00',
    website: 'https://www.thankgravelitsfriday.com/rides/event-one-c2dk5-7lxns-xp24k',
  },
];

const events = rides.map((ride) => ({ ...ride, title: ride.name, allDay: false }));

// Modal.setAppElement('#app');

function App() {
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  return (
    <div id="app">
      <h1>Rides of Boulder</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{
          end: 'dayGridMonth,dayGridWeek today prev,next',
        }}
        initialView="dayGridMonth"
        events={events}
        eventClick={(arg) => setSelectedEvent(arg.event)}
      />
      <p>
        Always check the website associated with the ride for details and cancelations.
        This calendar may not always be up to date.
      </p>

      <Modal
        isOpen={!!selectedEvent}
        onRequestClose={() => setSelectedEvent(null)}
        style={customStyles}
      >
        {selectedEvent?.extendedProps.orgId && (
          <h1>
            <a
              target="_blank"
              href={orgsById[selectedEvent?.extendedProps.orgId]?.website}
            >
              {orgsById[selectedEvent?.extendedProps.orgId].name}
            </a>
          </h1>
        )}
        <h2>
          <a target="_blank" href={selectedEvent?.extendedProps.website}>
            {selectedEvent?.extendedProps?.name}
          </a>
        </h2>
        <h3>
          {`${selectedEvent?.start?.toLocaleDateString()} ${selectedEvent?.start?.toLocaleTimeString()}`}
        </h3>

        {/* <pre>{JSON.stringify(selectedEvent, null, 2)}</pre> */}
      </Modal>
    </div>
  );
}

const customStyles: Modal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
  },
  overlay: { zIndex: 1000 },
};

export default App;
