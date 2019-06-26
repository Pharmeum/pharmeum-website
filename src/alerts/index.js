export const showAlert = (notificationDOMRef, title, message, type) => {
    notificationDOMRef.current.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 2000
        },
        dismissable: {
            click: true
        }
    });
};

export const showErrorAlert = (notificationDOMRef, message, code) => {
    switch (code) {
        case 400:
            showAlert(notificationDOMRef, "Bad request ", message, "warning");
            break;
        case 401:
            showAlert(notificationDOMRef, "Unauthorized: ", message, "warning");
            break;
        case 404:
            showAlert(notificationDOMRef, "No such page", "request failed", "danger");
            break;
        case 405:
            showAlert(notificationDOMRef, "Method not allowed", "API method does not exist", "warning");
            break;
        case 500:
            showAlert(
                notificationDOMRef,
                "Internal server error",
                "Please try again later",
                "danger"
            );
            break;
        default:
            showAlert(
                notificationDOMRef,
                "Unhandled status code",
                "Please ask administrator for more details",
                "danger"
            );
    }
};

export const showTransactionPendingAlert = notificationDOMRef => {
    showAlert(
        notificationDOMRef,
        "Transaction",
        "Creation Pending...",
        "default"
    );
};

export const showTransactionSuccessAlert = notificationDOMRef => {
    showAlert(notificationDOMRef, "Transaction", "Creation Success!", "success");
};

export const showWalletPendingAlert = notificationDOMRef => {
    showAlert(notificationDOMRef, "Wallet", "Creation Pending...", "default");
};

export const showWalletSuccessAlert = notificationDOMRef => {
    showAlert(notificationDOMRef, "Wallet", "Creation Success!", "success");
};

export const showWalletsLoadingAlert = notificationDOMRef => {
    showAlert(notificationDOMRef, "Wallets", "Loading...", "default");
};

//
export const showMedicationTransactionSuccessAlert = notificationDOMRef => {
    showAlert(notificationDOMRef, "Medication Transaction", "Creation Success!", "success");
};

export const showMedicationTransactionPendingAlert = notificationDOMRef => {
    showAlert(notificationDOMRef, "Medication Transaction", "Creation Pending...", "default");
};

export const showMedicationPendingAlert = notificationDOMRef => {
    showAlert(notificationDOMRef, "Medication", "Creation Pending...", "default");
};

export const showMedicationSuccessAlert = notificationDOMRef => {
    showAlert(notificationDOMRef, "Medication", "Creation Success!", "success");
};

export const showMedicationLoadingAlert = notificationDOMRef => {
    showAlert(notificationDOMRef, "Medication", "Loading...", "default");
};
