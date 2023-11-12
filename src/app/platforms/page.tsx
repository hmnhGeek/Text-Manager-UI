"use client";

import { useAppSelector } from "@/redux/store";
import PlatformCard from "../components/PlatformCards/PlatformCard";
import styles from './platforms.module.css';
import { useEffect, useState } from "react";
import cookie from 'js-cookie';
import api from "../api/api";

const TempPage: React.FC = () => {
    const username = useAppSelector(state => state.authReducer.value.username);
    const [platforms, setPlatforms] = useState([]);

    const fetchAvailablePlatforms = async () => {
        try {
            // Retrieve the token from cookies
            const token = cookie.get('token');
        
            // Make the Axios request with the token in the headers
            const response = await api.get(`/prompt_manager/get_all_platforms`, {
              headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
        
            // Access response data here
            setPlatforms(response.data);
        } catch (error) {
            // Handle errors here
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchAvailablePlatforms();
    }, []);

    return (
        <div className={styles.gridContainer}>
            <h1>Another Page</h1>
            <div className={styles.cardGrid}>
                {platforms.map((platform) => (
                <PlatformCard
                    // key={platform.id}
                    content={platform}
                    onClick={() => console.log("Clicking")}
                />
                ))}
            </div>
        </div>
    );
}

export default TempPage;