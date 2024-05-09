"use client ";
import { useState, useRef, useEffect } from "react";
import { KnockFeedProvider, NotificationIconButton, NotificationFeedPopover } from "@knocklabs/react-notification-feed";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react-notification-feed/dist/index.css";
import { useAuth } from "@clerk/nextjs";
import { BellIcon } from "@heroicons/react/24/outline";

const Notification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOnClient, setisOnClient] = useState(false);
  const notifButtonRef = useRef(null);
  const { sessionId, userId } = useAuth();
  useEffect(() => {
    setisOnClient(true);
  }, []);
  return isOnClient && sessionId ? (
    <KnockFeedProvider
      feedId="b88d7f16-8608-403d-a5e7-9b9bceb6e64d"
      apiKey="pk_test_S8Bl-2mOPitpfU5MSyboa6MKRJe22k7sg1ZjwG4ejU8"
      userId={userId}
    >
      <>
        <NotificationIconButton ref={notifButtonRef} onClick={(e) => setIsVisible(!isVisible)} />
        <NotificationFeedPopover buttonRef={notifButtonRef} isVisible={isVisible} onClose={() => setIsVisible(false)} />
      </>
    </KnockFeedProvider>
  ) : (
    <BellIcon className="size-[25px] text-dark-400 dark:text-light-900" aria-hidden="true" />
  );
};

export default Notification;
