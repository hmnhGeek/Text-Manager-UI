"use client";

import PlatformCard from "../components/PlatformCards/PlatformCard";
import styles from './platforms.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAvailablePlatforms } from "@/redux/actions/platformsActions";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

interface PlatformsPageProps {
    token: string | null;
    platforms: string[];
    fetchAvailablePlatforms: (token: string) => void;
}

const PlatformsPage: React.FC<PlatformsPageProps> = props => {
    const router = useRouter();
    const { token, platforms } = props;

    useEffect(() => {
        if(token) props.fetchAvailablePlatforms(token);
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

const mapStateToProps = (state: RootState) => {
    return {
        token: state.auth.token,
        platforms: state.platforms.platforms
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetchAvailablePlatforms: (token: string) => dispatch(fetchAvailablePlatforms(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsPage);