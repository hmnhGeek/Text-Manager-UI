"use client";

import PlatformCard from "../components/PlatformCards/PlatformCard";
import styles from './platforms.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAvailablePlatforms } from "@/redux/actions/platformsActions";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const PlatformsPage: React.FC = () => {
    const router = useRouter();
    const { token } = useSelector((state: RootState) => state.auth);
    const { platforms } = useSelector((state: RootState) => state.platforms);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(token) dispatch(fetchAvailablePlatforms(token));
        else router.push("/login");
    }, []);

    if(platforms && platforms.length > 0) {
        return (
            <div className={styles.gridContainer}>
                <h1>Available Platforms</h1>
                <div className={styles.cardGrid}>
                    {platforms.map((platform) => (
                    <PlatformCard
                        content={platform}
                        onClick={() => console.log("Clicking")}
                    />
                    ))}
                </div>
            </div>
        );
    }
    
    return null;
}

export default PlatformsPage;