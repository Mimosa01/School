import { useState } from 'react';

export const useRoomSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const toggleSearch = () => setIsSearchOpen(prev => !prev);

  return {
    isSearchOpen,
    openSearch,
    closeSearch,
    toggleSearch,
  };
};