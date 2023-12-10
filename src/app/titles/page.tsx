"use client";

import styles from './titles.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAvailablePlatforms } from "@/redux/actions/platformsActions";
import { RootState, AppDispatch } from "@/redux/store";
import { connect } from "react-redux";
import cookie from 'js-cookie';
import { fetchTitlesFromPlatform } from "@/redux/actions/titlesActions";
import CollapsibleCard from "../components/CollapsibleCard/CollapsibleCard";
import { TitlesType } from '@/redux/initialStates/titlesInitialState';
import CustomBreadcrumbs from '../components/Breadcrumbs/CustomBreadcrumbs';
import CustomSppedDial from '../components/CustomSpeedDial/CustomSpeedDial';
import AddIcon from '@mui/icons-material/Add';
import LayersIcon from '@mui/icons-material/Layers';
import CustomModal from '../components/CustomModal/CustomModal';
import AddTitleForm from '../components/AddTitleForm/AddTitleForm';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AddPromptForm from '../components/AddPromptForm/AddPromptForm';

interface TitlesPageProps {
    token: string | null;
    titles: TitlesType[];
    platform: string | null;
    pageError: string | null;
    reloadToggle: boolean;
    reloadAfterAddingPrompt: boolean;
    unlockKey: string | null;
    fetchAvailablePlatforms: (token: string) => void;
    fetchTitlesFromPlatform: (token: string, platform: string, unlockKey: string) => void;
}

const TitlesPage: React.FC<TitlesPageProps> = props => {
    const router = useRouter();
    const { token, titles, platform, pageError, reloadToggle, reloadAfterAddingPrompt, unlockKey } = props;
    const [isAddTitleModalOpen, setIsAddTitleModalOpen] = useState(false);
    const [isAddPromptModalOpen, setIsAddPromptModalOpen] = useState(false);

    useEffect(() => {
        if(pageError) {
            cookie.set("apiError", pageError);
            window.location.replace("/login");
        }
    }, [pageError]);

    useEffect(() => {
        if(token && platform && unlockKey) props.fetchTitlesFromPlatform(token, platform, unlockKey); 
        else {
            cookie.set("apiError", "Please prove your identity!");
            router.push("/login");
        }
    }, [reloadToggle, reloadAfterAddingPrompt]);

    if(titles && titles.length > 0) {
        return (
            <div className={styles.gridContainer}>
                <h1>Titles Available in {platform}</h1>
                <CustomBreadcrumbs />
                <div className={styles.cardGrid}>
                    {titles.map((obj) => (
                    <CollapsibleCard
                        title={obj.title}
                        prompts={obj.prompts}
                    />
                    ))}
                </div>
                <CustomSppedDial 
                    className={styles['custom-speed-dial']} 
                    actions={
                        [
                            {
                                icon: <AddIcon />,
                                name: "Add new title",
                                onClick: () => setIsAddTitleModalOpen(true)
                            },
                            {
                                icon: <AddToPhotosIcon />,
                                name: "Add a prompt",
                                onClick: () => setIsAddPromptModalOpen(true)
                            },
                        ]
                    }
                    speedDialIcon={<LayersIcon />}
                />
                <CustomModal title={"Add Title"} isOpen={isAddTitleModalOpen} onClose={() => setIsAddTitleModalOpen(false)} >
                    <AddTitleForm currentPlatform={platform || ""} />
                </CustomModal>
                <CustomModal title={"Add Prompt"} isOpen={isAddPromptModalOpen} onClose={() => setIsAddPromptModalOpen(false)} >
                    <AddPromptForm allAvailableTitles={titles.map(o => o.title)} currentPlatform={platform || ""} />
                </CustomModal>
            </div>
        );
    }
    
    return null;
}

const mapStateToProps = (state: RootState) => {
    return {
        token: state.auth.token,
        platform: state.titles.platform,
        titles: state.titles.titles,
        pageError: state.titles.error,
        reloadToggle: state.addPlatform.reloadPlatformsPageToggleFlag,
        reloadAfterAddingPrompt: state.addPrompt.reloadTitlesPageToggleFlag,
        unlockKey: state.encryption.key,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetchAvailablePlatforms: (token: string) => dispatch(fetchAvailablePlatforms(token)),
        fetchTitlesFromPlatform: (token: string, platform: string, unlockKey: string) => dispatch(fetchTitlesFromPlatform(token, platform, unlockKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlesPage);