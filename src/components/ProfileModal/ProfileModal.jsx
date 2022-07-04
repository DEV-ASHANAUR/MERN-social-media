import React from 'react'
import './ProfileModal.css';
import { Modal, useMantineTheme } from "@mantine/core";
const ProfileModal = ({ modalOpened, setModalOpened }) => {
    const theme = useMantineTheme();
    return (
        <Modal overlayColor={
            theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[2]
        }
            overlayOpacity={0.55}
            overlayBlur={3}
            size="55%"
            opened={modalOpened}
            onClose={() => setModalOpened(false)}>
            <form className="infoForm">
                <h3>Your info</h3>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="FirstName"
                        placeholder="First Name"
                    />

                    <input
                        type="text"
                        className="infoInput"
                        name="LastName"
                        placeholder="Last Name"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="worksAT"
                        placeholder="Works at"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="livesIN"
                        placeholder="LIves in"
                    />

                    <input
                        type="text"
                        className="infoInput"
                        name="Country"
                        placeholder="Country"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        placeholder="RelationShip Status"
                    />
                </div>


                <div>
                    <div className="upload-div">
                        <small>Profile Image</small>
                        <input type="file" name='profileImg' />
                    </div>
                    <div className='upload-div'>    
                        <small>Cover Image</small>
                        <input type="file" name="coverImg" />
                    </div>
                </div>

                <button className="button info-button">Update</button>
            </form>

        </Modal>
    )
}

export default ProfileModal