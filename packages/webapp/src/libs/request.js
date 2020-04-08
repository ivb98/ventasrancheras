import axios from "axios";

const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1hbmFnZXIiLCJpYXQiOjE1ODYxODgwOTAsImV4cCI6MTY0OTMwMzI5MH0.mksu2bwOSI4bboXog_ObQVr0_jKZt6904M3eHi_8cFc";

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

const getData = async url => {
    var info = await axios.get(url, config).then(res => {
        return res.data;
    });

    return info;
};

export const fetchTheData = async (data, setData) => {
    const stateObject = {};

    const requests = [
        { endpoint: "/salesman", name: "salesman" },
        { endpoint: "/package", name: "packages" },
        { endpoint: "/delivery", name: "deliveries" },
        { endpoint: "/customer", name: "customers" }
        
    ];

    if (token) {
        config.headers["Authorization"] = token;
    }

    setData(prev => ({
        ...prev,
        loading: {
            isLoading: true,
            current: 1,
            total: requests.length,
        },
    }));

    for (let i = 0; i < requests.length; i++) {
        setData(prev => ({
            ...prev,
            loading: { isLoading: true, current: i + 1, total: requests.length },
        }));
        const { endpoint } = requests[i];
        try {
            const fetchedData = await getData(endpoint);
            stateObject[requests[i].name] = fetchedData;
        
        } catch {
            return null;
        }
    }

    console.log(stateObject);
    
    setData(prev => ({
        ...prev,
        ...stateObject,
        loading: { isLoading: false, current: 1, total: 1 },
    }));
};
