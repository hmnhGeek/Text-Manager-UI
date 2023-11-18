"use client";

import PlatformCard from "../components/PlatformCards/PlatformCard";
import styles from './platforms.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAvailablePlatforms } from "@/redux/actions/platformsActions";
import { RootState, AppDispatch } from "@/redux/store";
import { connect } from "react-redux";
import cookie from 'js-cookie';
import { setPlatformForPromptsLoading } from "@/redux/actions/titlesActions";
import CustomSppedDial from "../components/CustomSpeedDial/CustomSpeedDial";

interface PlatformsPageProps {
    token: string | null;
    platforms: string[];
    settedPlatform: string | null;
    fetchAvailablePlatforms: (token: string) => void;
    setPlatformForPromptsLoading: (platform: string) => void;
}

const PlatformsPage: React.FC<PlatformsPageProps> = props => {
    const router = useRouter();
    const { token, platforms, settedPlatform } = props;

    useEffect(() => {
        if(token) props.fetchAvailablePlatforms(token);
        else {
            cookie.set("apiError", "Please prove your identity!");
            router.push("/login");
        }
    }, []);

    useEffect(() => {
        if(settedPlatform) {
            router.push("/titles");
        }
    }, [settedPlatform]);

    const setPlatform = (platform: string) => {
        props.setPlatformForPromptsLoading(platform);
    }

    if(platforms && platforms.length > 0) {
        return (
            <div className={styles.gridContainer}>
                <h1>Available Platforms</h1>
                <div className={styles.cardGrid}>
                    {platforms.map((platform) => (
                    <PlatformCard
                        content={platform}
                        onClick={() => setPlatform(platform)}
                    />
                    ))}
                </div>
                <CustomSppedDial className={styles['custom-speed-dial']} />
            </div>
        );
    }
    
    return null;
}

const mapStateToProps = (state: RootState) => {
    return {
        token: state.auth.token,
        platforms: state.platforms.platforms,
        settedPlatform: state.titles.platform
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetchAvailablePlatforms: (token: string) => dispatch(fetchAvailablePlatforms(token)),
        setPlatformForPromptsLoading: (platform: string) => dispatch(setPlatformForPromptsLoading(platform)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsPage);