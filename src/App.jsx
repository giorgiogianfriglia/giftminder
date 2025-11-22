import React from 'react';
import { useGiftMinder } from './hooks/useGiftMinder';
import AuthScreen from './components/auth/AuthScreen';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import {
    Toast,
    ConfirmModal,
    SettingsModal,
    PersonModal,
    GiftModal,
    AddEventModal,
    ArchiveModal,
    StatsModal,
} from './components/modals/Modals';
import { calcolaOccorrenza } from './utils/helpers';

export default function App() {
    const giftMinder = useGiftMinder();

    if (!giftMinder.session) {
        return <AuthScreen {...giftMinder} />;
    }

    return (
        <div className="h-screen flex flex-col md:flex-row bg-white text-gray-800 overflow-hidden relative">
            {giftMinder.toastMsg && <Toast msg={giftMinder.toastMsg} />}

            {giftMinder.confirmConfig.show && (
                <ConfirmModal
                    config={giftMinder.confirmConfig}
                    onCancel={() => giftMinder.setConfirmConfig({ ...giftMinder.confirmConfig, show: false })}
                    onConfirm={giftMinder.executeConfirm}
                />
            )}

            <Sidebar {...giftMinder} />
            <MainContent {...giftMinder} calcolaOccorrenza={calcolaOccorrenza} />

            {giftMinder.showSettings && (
                <SettingsModal
                    currentTheme={giftMinder.currentTheme}
                    setCurrentTheme={giftMinder.setCurrentTheme}
                    onClose={() => giftMinder.setShowSettings(false)}
                    handleLogout={giftMinder.handleLogout}
                />
            )}

            {giftMinder.showModalPerson && (
                <PersonModal
                    onClose={() => giftMinder.setShowModalPerson(false)}
                    {...giftMinder}
                />
            )}

            {giftMinder.showModalGift && (
                <GiftModal
                    onClose={() => giftMinder.setShowModalGift(false)}
                    {...giftMinder}
                />
            )}

            {giftMinder.showAddEventModal && (
                <AddEventModal
                    onClose={() => giftMinder.setShowAddEventModal(false)}
                    {...giftMinder}
                />
            )}

            {giftMinder.showArchive && (
                <ArchiveModal
                    onClose={() => giftMinder.setShowArchive(false)}
                    {...giftMinder}
                />
            )}

            {giftMinder.showModalStats && giftMinder.activePerson && (
                <StatsModal
                    onClose={() => giftMinder.setShowModalStats(false)}
                    {...giftMinder}
                />
            )}
        </div>
    );
}
