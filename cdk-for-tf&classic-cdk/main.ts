import { Construct } from "constructs";
import { Stack, StackProps, aws_ec2 as ec2, Tags, RemovalPolicy } from 'aws-cdk-lib';
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Instance } from "@cdktf/provider-aws/lib/instance";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "eu-central-1",
    });

    const ec2Instance = new Instance(this, "compute", {
      ami: "ami-01456a894f71116f2",
      instanceType: "t2.micro",
      tags: {
          Name: "cdktf-instance",
      }
    });

    const testInstance = new ec2.Instance(this, "test", {
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      vpc: new ec2.Vpc(this, "vpc"),
    });

    new TerraformOutput(this, "public_ip", {
      value: ec2Instance.publicIp,
    });

  }
}

const app = new App();
new MyStack(app, "cdk-for-tf");
app.synth();
