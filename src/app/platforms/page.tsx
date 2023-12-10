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
import AddIcon from '@mui/icons-material/Add';
import LayersIcon from '@mui/icons-material/Layers';
import CustomModal from "../components/CustomModal/CustomModal";
import AddPlatformForm from "../components/AddPlatformForm/AddPlatformForm";
import { Toolbar } from "@mui/material";
import UnlockTitlesForm from "../components/UnlockTitlesForm/UnlockTitlesForm";
import { setEncryptionKey } from "@/redux/actions/encryptionActions";

interface PlatformsPageProps {
    token: string | null;
    platforms: string[];
    settedPlatform: string | null;
    reloadToggle: boolean;
    pageError: string | null;
    unlockKey: string | null;
    fetchAvailablePlatforms: (token: string) => void;
    setPlatformForPromptsLoading: (platform: string) => void;
    setEncryptionKey: (key: string | null) => void;
}

const PlatformsPage: React.FC<PlatformsPageProps> = props => {
    const router = useRouter();
    const { token, platforms, settedPlatform, reloadToggle, pageError, unlockKey } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);

    useEffect(() => {
        if(pageError) {
            cookie.set("apiError", pageError);
            window.location.replace("/login");
        }
    }, [pageError]);

    useEffect(() => {
        if(token) props.fetchAvailablePlatforms(token);
        else {
            cookie.set("apiError", "Please prove your identity!");
            router.push("/login");
        }
    }, [reloadToggle]);

    useEffect(() => {
        if(settedPlatform && unlockKey) {
            router.push("/titles");
        }
    }, [settedPlatform, unlockKey]);

    // ensure that encryption key is set to null on mount to avoid unnecessary redirects to /titles.
    useEffect(() => props.setEncryptionKey(null), []);

    const setPlatform = (platform: string) => {
        props.setPlatformForPromptsLoading(platform);
    }

    const initiateDecrypt = (platform: string) => {
        setIsUnlockModalOpen(true);
        setPlatform(platform);
    }
    
    return (
        <>
            {
                platforms && platforms.length > 0 && (
                    <div className={styles.gridContainer}>
                        <h1>Available Platforms</h1>
                        <Toolbar />
                        <div className={styles.cardGrid}>
                            {platforms.map((platform) => (
                            <PlatformCard
                                content={platform}
                                onClick={() => initiateDecrypt(platform)}
                            />
                            ))}
                        </div>
                    </div>
                )
            }
            <CustomSppedDial 
                className={styles['custom-speed-dial']} 
                actions={
                    [
                        {
                            icon: <AddIcon />,
                            name: "Add new platform",
                            onClick: () => setIsModalOpen(true)
                        }
                    ]
                }
                speedDialIcon={<LayersIcon />}
            />
            <CustomModal title={"Add Platform"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                <AddPlatformForm />
            </CustomModal>
            <CustomModal title={"Unlock Titles"} isOpen={isUnlockModalOpen} onClose={() => setIsUnlockModalOpen(false)}>
                <UnlockTitlesForm />
            </CustomModal>
        </>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        token: state.auth.token,
        platforms: state.platforms.platforms,
        settedPlatform: state.titles.platform,
        reloadToggle: state.addPlatform.reloadPlatformsPageToggleFlag,
        pageError: state.platforms.error,
        unlockKey: state.encryption.key,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetchAvailablePlatforms: (token: string) => dispatch(fetchAvailablePlatforms(token)),
        setPlatformForPromptsLoading: (platform: string) => dispatch(setPlatformForPromptsLoading(platform)),
        setEncryptionKey: (key: string | null) => dispatch(setEncryptionKey(key)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsPage);