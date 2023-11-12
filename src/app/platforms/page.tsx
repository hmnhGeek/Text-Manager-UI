"use client";

import PlatformCard from "../components/PlatformCards/PlatformCard";
import styles from './platforms.module.css';
import { useEffect, useState } from "react";
import cookie from 'js-cookie';
import api from "../api/api";
import { useRouter } from "next/navigation";

const TempPage: React.FC = () => {
    const [platforms, setPlatforms] = useState([]);
    const router = useRouter();

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
        } catch (error: any) {
            cookie.set("apiError", error.response.data.detail);
            router.push("/login");
        }
    }

    useEffect(() => {
        fetchAvailablePlatforms();
    }, []);

    return (
        <div className={styles.gridContainer}>
            <h1>Available Platforms</h1>
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