import axios from "axios";

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

export const fetchTheData = async (data, setData, token) => {
    const stateObject = {};

    const requests = [
        { endpoint: "/salesman", name: "salesman" },
        { endpoint: "/package", name: "packages" },
        { endpoint: "/delivery", name: "deliveries" },
        { endpoint: "/customer", name: "customers" },
    ];

    config.headers["Authorization"] = token;

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
