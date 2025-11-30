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
import { calcolaOccorrenza, formatFixedDate } from './utils/helpers';

export default function App() {
    const giftMinder = useGiftMinder();

    if (!giftMinder.session) {
        return <AuthScreen {...giftMinder} />;
    }

    return (
        <div className="flex flex-col md:flex-row bg-white text-gray-800 overflow-hidden relative h-full">
            {giftMinder.toastMsg && <Toast msg={giftMinder.toastMsg} />}

            {giftMinder.confirmConfig.show && (
                <ConfirmModal
                    config={giftMinder.confirmConfig}
                    onCancel={() => giftMinder.setConfirmConfig({ ...giftMinder.confirmConfig, show: false })}
                    onConfirm={giftMinder.executeConfirm}
                />
            )}

            <div className="flex-grow contents order-2 md:order-1">
                <Sidebar {...giftMinder} />
            </div>
            <div className="flex-grow contents order-1 md:order-2">
                <MainContent {...giftMinder} calcolaOccorrenza={calcolaOccorrenza} formatFixedDate={formatFixedDate} />
            </div>

            {giftMinder.showSettings && (
                <SettingsModal
                    {...giftMinder}
                    onClose={() => giftMinder.setShowSettings(false)}
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
                    onClose={() => {
                        giftMinder.setShowModalGift(false);
                        giftMinder.setPendingNewEventData(null);
                    }}
                    {...giftMinder}
                />
            )}

            {giftMinder.showAddEventModal && (
                <AddEventModal
                    onClose={() => giftMinder.setShowAddEventModal(false)}
                    isAddingEventFromGiftModal={giftMinder.isAddingEventFromGiftModal}
                    setIsAddingEventFromGiftModal={giftMinder.setIsAddingEventFromGiftModal}
                    setPendingNewEventData={giftMinder.setPendingNewEventData}
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
