class ApiRoutes {
    constructor() {}

    authSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5010`
        : "localhost:3010";

    resourceSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5011`
        : "localhost:3011";

    searchSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5012`
        : "localhost:3012";

    taskSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5013`
        : "localhost:3013";

    projectSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5014`
        : "localhost:3014";

    forumSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5015`
        : "localhost:3015";

    organisationSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5016`
        : "localhost:3016";

    notificationsSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5017`
        : "localhost:3017";
}

export default ApiRoutes;