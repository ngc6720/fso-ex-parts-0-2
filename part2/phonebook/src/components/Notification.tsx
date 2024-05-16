const Notif = ({ notification }: { notification: Notif | null }) => {
  if (!notification) {
    return null;
  }

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
};

export default Notif;
