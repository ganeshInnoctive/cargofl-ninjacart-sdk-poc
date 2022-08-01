let BASE_URL = "http://v3.cargofl.com"
//let BASE_URL = "http://3.6.37.123:5000"



let ENDPOINT_GENERATE_AUTH_TOKEN = "/api/v3/tracking/sim-tracking/generate-auth-token"
let ENDPOINT_ADD_DRIVER = "/api/v3/tracking/user/add-driver-for-sim-tracking"
let ENDPOINT_GET_USER_DETAILS_FROM_FLEETOS = "/api/v3/tracking/sim-tracking/get-user-details?mobile_number="
let ENDPOINT_SEND_CONSENT = "/api/v3/tracking/sim-tracking/send-consent?user_id="
let GET_ALL_DRIVERS = "/api/v3/tracking/user/get-all-drivers-paginated"
let GET_ALL_TRACKING_ENTRIES = "/api/v3/tracking/sim-tracking/get-all-tracking-entries"
let ADD_TRACKING_ENTRY = "/api/v3/tracking/sim-tracking/add-tracking-entry"
let GET_DRIVERS_SELECT = "/api/v3/tracking/user/get-all-drivers"
let GET_USER_LOCATION_HISTORY = "/api/v3/tracking/sim-tracking/get-user-location-history"