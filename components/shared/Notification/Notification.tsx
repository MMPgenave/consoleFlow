"use client ";
import { useState, useRef, useEffect } from "react";
import { KnockProvider, KnockFeedProvider, NotificationIconButton, NotificationFeedPopover } from "@knocklabs/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import { useAuth } from "@clerk/nextjs";
import { BellIcon } from "@heroicons/react/24/outline";

const Notification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOnClient, setisOnClient] = useState(false);
  const notifButtonRef = useRef(null);
  const { userId, sessionId } = useAuth();
  useEffect(() => {
    setisOnClient(true);
  }, []);

  return isOnClient && sessionId ? (
    <KnockProvider
      // @ts-ignore

      apiKey={process.env.KNOCK_PUBLIC_KEY}
      // @ts-ignore
      userId={userId}
    >
      {/* @ts-ignore */}
      <KnockFeedProvider feedId={process.env.KNOCK_FEED_CHANNEL_ID}>
        <>
          <NotificationIconButton ref={notifButtonRef} onClick={(e) => setIsVisible(!isVisible)} />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  ) : (
    <BellIcon className="size-[25px] text-dark-400 dark:text-light-900" aria-hidden="true" />
  );
};

export default Notification;
