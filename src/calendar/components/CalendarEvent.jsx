
export const CalendarEvent = ({ event }) => {

    const { title, user } = event;

    return (
        <>
            <span>
                <strong>
                    {title}
                </strong>
                &nbsp;
                {user.name}
            </span>

        </>
    )
}
