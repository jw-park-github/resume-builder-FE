import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { createGlobalStyle } from 'styled-components';

// MenuListComposition.js: 드롭다운 메뉴

// 프린트 시 composition-button 숨김
const GlobalStyle = createGlobalStyle`
  @media print {
      #composition-button {
          display: none !important;
      }
  }
`;

const MenuListComposition = ({ menuTitle, menuItems, onSelect, selected }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedTitle, setSelectedTitle] = React.useState(selected || menuTitle);

    // 메뉴 토글 처리
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    // 메뉴 닫기 처리
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    // KeyDown 이벤트 처리
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // 메뉴 아이템 클릭 처리
    const handleMenuItemClick = (event, item) => {
        onSelect(item);
        setSelectedTitle(item);
        handleClose(event);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    React.useEffect(() => {
        setSelectedTitle(selected || menuTitle);
    }, [selected, menuTitle]);

    return (
        <>
            <GlobalStyle />
            <Stack direction="row" spacing={2}>
                <div style={{ borderStyle: "solid", borderWidth: 1, borderColor: "#ccc", borderRadius: 4, padding: 7 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 5 }}>
                        <span>{selectedTitle}</span>
                        <button
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            style={{ backgroundColor: "grey", color: "white", border: "none", borderRadius: 7, width: 20, cursor: "pointer" }}
                        >
                            v
                        </button>
                    </div>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            {menuItems.map((item) => (
                                                <MenuItem key={item} onClick={(event) => handleMenuItemClick(event, item)}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </Stack>
        </>
    );
}

export default MenuListComposition;
