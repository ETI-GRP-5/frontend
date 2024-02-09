class ApiRoutes {
    constructor() {}

    authSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5010`
        : "ec2-54-91-152-14.compute-1.amazonaws.com:5010";

    resourceSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5011`
        : "ec2-54-91-152-14.compute-1.amazonaws.com:5011";

    searchSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5012`
        : "ec2-54-91-152-14.compute-1.amazonaws.com:5012";

    taskSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5013`
        : "ec2-54-91-152-14.compute-1.amazonaws.com:5013";

    projectSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5014`
        : "ec2-54-91-152-14.compute-1.amazonaws.com:5014";

    forumSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5015`
        : "ec2-54-91-152-14.compute-1.amazonaws.com:5015";

    organisationSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5016`
        : "ec2-54-91-152-14.compute-1.amazonaws.com:5016";

    notificationsSVC = process.env.NEXT_PUBLIC_PORT
        ? `${process.env.NEXT_PUBLIC_DOMAIN}:5017`
        : "ec2-54-91-152-14.compute-1.amazonaws.com:5017";
}

export default ApiRoutes;