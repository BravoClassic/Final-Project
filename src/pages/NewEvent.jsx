import {
  AcademicCapIcon,
  GlobeAltIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const NewEvent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const [startDateandTime, setStartDateandTime] = useState(new Date());
  const [endDateandTime, setEndDateandTime] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location1, setLocation1] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [category, setCategory] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [latitude, setLatitude] = useState("40.7128");
  const [longitude, setLongitude] = useState("-74.006");
  const [error, setError] = useState(false);

  const [eventData, setEventData] = useState({
    eventTitle: eventTitle,
    description: description,
    image: image,
    category: category,
    latitude: latitude,
    longitude: longitude,
    privacy: privacy,
    startDate: startDate,
    endDate: endDate,
  });
  const [location, setLocation] = useState({});
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  async function success(pos) {
    var crd = await pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setLocation(crd);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            success({
              coords: {
                latitude: 40.7128,
                longitude: -74.006,
                accuracy: 0,
              },
            });
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleEventSubmit = (e) => {
      e.preventDefault();
    console.log(startDate, endDate);
    console.log(startTime, endTime);

    let fullStart = new Date( startDate +" " +startTime);
    let fullEnd = new Date( endDate+" "+ endTime);
    setStartDateandTime(fullStart);
    setEndDateandTime(fullEnd);
    console.log(startDateandTime.toISOString());
    console.log(endDateandTime.toISOString());
    if (startDateandTime > endDateandTime) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      // alert("Start date and time must be before end date and time");
      return;
    } else {

      setEventData({
        ...eventData,
        latitude: location.latitude || 40.7128,
        longitude: location.longitude || -74.006,
      });
      const form = document.getElementById("signUpForm");
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      console.log(data);
    }

    // dispatch(signup(data));
  };
  useEffect(() => {
    console.log(location);
    console.log(eventData);
  }, [location]);

  return (
    <div className="">
      <div
        class={`bg-red-100 border ${
          error ? "block" : "hidden"
        } border-red-400 text-red-700 px-4 py-3 rounded fixed bottom-0 right-0 z-50`}
        role="alert"
      >
        <strong class="font-bold">Holy smokes!</strong>
        <span class="block sm:inline">
          Start date and time must be before end date and time.
        </span>
        <span
          class="absolute top-0 bottom-0 right-0 px-4 py-3"
          onClick={() => setError(!error)}
        >
          <svg
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
      <h1 className="text-lg font-bold text-gray-700 leading-tight text-center mt-12 mb-5">
        Create Event
      </h1>
      <form
        id="signUpForm"
        className="p-12 shadow-md rounded-2xl bg-white mx-auto border-solid border-2 border-gray-100 mb-8"
        action="#!"
        onSubmit={handleEventSubmit}
      >
        <div className="step">
          <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
            Event Details
          </p>
          <div className="mb-6">
            <input
              type="Text"
              placeholder="Title of Event"
              onInput={(e) => setEventTitle(e.target.value)}
              name="eventTitle"
              className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
              oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              onInput={(e) => setDescription(e.target.value)}
              placeholder="Description"
              name="description"
              className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
              oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
            />
          </div>
          <div className="mb-6">
            <select
              placeholder="Select Category"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
              // oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
            >
              <option value="0">Select Category</option>
              <option value="2">Campus Events</option>
              <option value="1">Athletics</option>
              <option value="3">Good Eats</option>
              <option value="4">Night life</option>
              <option value="5">Politics</option>
              <option value="6">Greek Life</option>
            </select>
          </div>
          <div className="mb-6">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
              accept="image/png, image/jpeg, image/jpg"
              placeholder="Location"
              name="location"
              className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
              // oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
            />
            <p>Choose new Image</p>
          </div>
        </div>

        <div className="step">
          <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
            Privacy
          </p>
          <fieldset className="">
            <div className="mb-6">
              <label className="w-full px-4 py-3 inline-flex justify-between rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200">
                <div className="w-full inline-flex">
                  <GlobeAltIcon className=" h-6 w-6" />
                  <span className="ml-2">Anyone Around Me</span>
                </div>

                <input
                  type="radio"
                  onSelect={(e) => setPrivacy(e.target.value)}
                  placeholder="Anyone Around Me"
                  name="privacy"
                  className="inline-block ml-5"
                  // className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                  oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                />
              </label>
            </div>
            <div className="mb-6">
              <label className="w-full px-4 py-3 inline-flex justify-between rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200">
                <div className="w-full inline-flex">
                  <AcademicCapIcon className=" h-6 w-6" />
                  <span className="ml-2">Just My School</span>
                </div>

                <input
                  type="radio"
                  onSelect={(e) => setPrivacy(e.target.value)}
                  placeholder=" Just My School"
                  name="privacy"
                  className="inline-block ml-5"
                  // className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                  oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                />
              </label>
            </div>
            <div className="mb-6">
              <label className="w-full px-4 py-3 inline-flex justify-between rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200">
                <div className="w-full inline-flex">
                  <UserIcon className=" h-6 w-6" />
                  <span className="ml-2">Just Me (Private)</span>
                </div>

                <input
                  type="radio"
                  onSelect={(e) => setPrivacy(e.target.value)}
                  placeholder="Just Me"
                  name="privacy"
                  className="inline-block ml-5"
                  // className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                  oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                />
              </label>
            </div>
          </fieldset>
          <p
            className=" 
          text-md text-gray-700 leading-tight text-center mt-8 mb-5"
          >
            Location
          </p>
          <fieldset className="">
            <div className="mb-6">
              <label className="w-full px-4 py-3 inline-flex justify-between rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200">
                <div className="w-full inline-flex">
                  <GlobeAltIcon className=" h-6 w-6" />
                  <span className="ml-2">Somewhere off campus</span>
                </div>

                <input
                  type="radio"
                  onSelect={(e) => setLocation1(e.target.value)}
                  placeholder="Anyone Around Me"
                  name="location"
                  className="inline-block ml-5"
                  // className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                  oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                />
              </label>
            </div>
            <div className="mb-6">
              <label className="w-full px-4 py-3 inline-flex justify-between rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200">
                <div className="w-full inline-flex">
                  <AcademicCapIcon className=" h-6 w-6" />
                  <span className="ml-2">Somewhere around campus</span>
                </div>

                <input
                  type="radio"
                  onSelect={(e) => setLocation1(e.target.value)}
                  placeholder=" Just My School"
                  name="location"
                  className="inline-block ml-5"
                  // className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                  oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                />
              </label>
            </div>
            {/* <iframe
              title="location"
              // src={`http://maps.apple.com/?q=${encodeURIComponent(
              //   eventData.eventTitle
              // ).trim()}&ll=${location.latitude},${location.longitude}`}
              // src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent( eventData.eventTitle )}`}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.880547964023!2d-73.985099684593!3d40.748440979328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a6d5c1a9d7%3A0x3e9b4e6d0d1b6b9a!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623934118989!5m2!1sen!2sus"
              className="
              w-full  h-96 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200
              "
              allowfullscreen=""
              loading="lazy"
            ></iframe> */}
            <iframe
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11547.339371534144!2d-116.67549845000002!3d43.6516044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54afb470291e4a55%3A0xc14de158c8f73677!2sCollege%20of%20Idaho!5e0!3m2!1sen!2sus!4v1700286515910!5m2!1sen!2sus"
              className="w-full  h-96 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </fieldset>
        </div>

        <div className="step">
          <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
            Select Date and Time
          </p>
          <div className="mb-6">
            <p>Start Date and Time</p>
            <div className="inline-flex w-full">
              <input
                type="date"
                placeholder="Select Start Date"
                name="startdate"
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                // oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
              />
              <input
                type="time"
                placeholder="Select Start Date"
                onChange={(e) => setStartTime(e.target.value)}
                name="starttime"
                className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                // oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
              />
            </div>
          </div>
          <div className="mb-6">
            <p>End Date and Time</p>
            <div className="inline-flex w-full">
              <input
                type="date"
                placeholder="Select Start Date"
                name="enddate"
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
              />
              <input
                type="time"
                placeholder="Select Start Date"
                name="endtime"
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                // oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
              />
            </div>
          </div>
          {/* <div className="mb-6">
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
              oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
            />
          </div> */}
        </div>

        <div className="form-footer flex gap-3">
          <button
            type="submit"
            id="nextBtn"
            className="flex-1 border border-transparent focus:outline-none p-3 rounded-md text-center text-white bg-indigo-600 hover:bg-indigo-700 text-lg"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;
