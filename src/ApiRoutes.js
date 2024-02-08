class ApiRoutes {
    constructor() {}

    authSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5010`
        : "http://ec2-54-173-92-27.compute-1.amazonaws.com:5010";

    resourceSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5011`
        : "http://ec2-54-173-92-27.compute-1.amazonaws.com:5011";

    searchSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5012`
        : "http://ec2-54-173-92-27.compute-1.amazonaws.com:5012";

    taskSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5013`
        : "http://ec2-54-173-92-27.compute-1.amazonaws.com:5013";

    projectSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5014`
        : "http://ec2-54-173-92-27.compute-1.amazonaws.com:5014";

    forumSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5015`
        : "http://ec2-54-173-92-27.compute-1.amazonaws.com:5015";

    organisationSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5016`
        : "http://ec2-54-173-92-27.compute-1.amazonaws.com:5016";

    notificationsSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5017`
        : "http://ec2-54-173-92-27.compute-1.amazonaws.com:5017";
}

export default ApiRoutes;